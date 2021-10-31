import { IonChip, IonIcon, IonRow } from '@ionic/react';
import { arrowBack, close } from 'ionicons/icons';
import _debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import useToastContext from '../../../../hooks/useToastContext';
import './CreateChannel.css';
import noProfileImage from "../../../../assets/no-profile-image.png";

const UserResult = ({ user }) => (
  <li className='messaging-create-channel__user-result'>
    <Avatar image={user.image || noProfileImage} name={user.name || user.id} size={40} />
    {user.online && <div className='messaging-create-channel__user-result-online' />}
    <div className='messaging-create-channel__user-result__details'>
      <span>{user.name}</span>
      {/* <span className='messaging-create-channel__user-result__details__last-seen'>{user.online}</span> */}
    </div>
  </li>
);

const CreateChannel = ({ onClose, openNav }) => {
  const setToast = useToastContext();
  const { client, setActiveChannel } = useChatContext();

  const [focusedUser, setFocusedUser] = useState(undefined);
  const [inputText, setInputText] = useState('');
  const [resultsOpen, setResultsOpen] = useState(false);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const inputRef = useRef();

  const clearState = () => {
    setInputText('');
    setResultsOpen(false);
    setSearchEmpty(false);
  };

  useEffect(() => {
    const clickListener = () => {
      if (resultsOpen) clearState();
    };

    document.addEventListener('click', clickListener);

    return () => document.removeEventListener('click', clickListener);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const findUsers = async () => {
    if (searching) return;
    setSearching(true);

    try {
      const response = await client.queryUsers(
        {
          id: { $ne: client.userID },
          $and: [
            { name: { $autocomplete: inputText } },
            { name: { $nin: ['Daniel Smith', 'Kevin Rosen', 'Jen Alexander'] } },
          ],
        },
        { id: 1 },
        { limit: 6 },
      );

      if (!response.users.length) {
        setSearchEmpty(true);
      } else {
        setSearchEmpty(false);
        setUsers(response.users);
      }

      setResultsOpen(true);
    } catch (error) {
      setToast({ message: "Failed to load search results. Please try again later.", color: "danger" });
    }
      
    setSearching(false);
  };

  const findUsersDebounce = _debounce(findUsers, 100, {
    trailing: true,
  });

  useEffect(() => {
    if (inputText) {
      findUsers();
      // findUsersDebounce();
    }
  }, [inputText]); // eslint-disable-line react-hooks/exhaustive-deps

  const createChannel = async (selectedUser) => {
    if (!selectedUser) return;
    const selectedUserId = selectedUser.id;

    try {
      const conversation = await client.channel('messaging', {
        members: [client.userID, selectedUserId],
      });

      await conversation.watch();
      setActiveChannel(conversation);
      setSelectedUser(null);
      onClose();
    } catch (e) {
      setToast({ message: "Unable to open chat. Please try again.", color: "danger" });
    }
  };

  const addUser = (user) => {
    const isAlreadyAdded = selectedUser && selectedUser.id === user.id // selectedUser.find((user) => user.id === u.id);
    if (isAlreadyAdded) return;

    setSelectedUser(user);
    setResultsOpen(false);
    setInputText('');
    inputRef.current.focus();
  };

  const removeUser = () => {
    setSelectedUser(null);
  };

  const handleKeyDown = useCallback(
    (e) => {
      // check for up(38) or down(40) key
      if (e.which === 38) {
        setFocusedUser((prevFocused) => {
          if (prevFocused === undefined) return 0;
          return prevFocused === 0 ? users.length - 1 : prevFocused - 1;
        });
      }
      if (e.which === 40) {
        setFocusedUser((prevFocused) => {
          if (prevFocused === undefined) return 0;
          return prevFocused === users.length - 1 ? 0 : prevFocused + 1;
        });
      }
      if (e.which === 13) {
        e.preventDefault();
        if (focusedUser !== undefined) {
          addUser(users[focusedUser]);
          return setFocusedUser(undefined);
        }
      }
    },
    [users, focusedUser], // eslint-disable-line
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className='messaging-create-channel'>
      <header>
        <div className='messaging-create-channel__left'>
          <div className='close-mobile-create' onClick={openNav}>
            <IonIcon size="large" icon={arrowBack} className="ion-margin-right" />
          </div>
          <div className='messaging-create-channel__left-text'>To: </div>
          <div className='users-input-container'>
            {selectedUser &&
              <IonChip onClick={removeUser}>
                <div className='messaging-create-channel__user-text'>{selectedUser.name}</div>
                <IonIcon icon={close} />
              </IonChip>
            }
            {!selectedUser &&
              <form onSubmit={addUser}>
                <input
                  autoFocus
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={!selectedUser ? 'Start typing for suggestions' : ''}
                  type='text'
                  className='messaging-create-channel__input'
                />
              </form>
            }
          </div>
        </div>
      </header>
      {inputText && (
        <main>
          <ul className='messaging-create-channel__user-results'>
            {!!users?.length && !searchEmpty && (
              <div>
                {users.map((user, i) => (
                  <div
                    className="messaging-create-channel__user-result"
                    onClick={() => createChannel(user)}
                    key={user.id}
                  >
                    <UserResult user={user} />
                  </div>
                ))}
              </div>
            )}
            {searchEmpty && (
              <div
                onClick={() => {
                  inputRef.current.focus();
                  clearState();
                }}
                className='messaging-create-channel__user-result empty'
              >
                No users found...
              </div>
            )}
          </ul>
        </main>
      )}
    </div>
  );
};

export default React.memo(CreateChannel);
