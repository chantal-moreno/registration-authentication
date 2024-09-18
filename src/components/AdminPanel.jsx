import { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPanel() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    // Get token from Local Storage
    const token = localStorage.getItem('token');

    const server = 'https://test4-backend-82s0.onrender.com';
    const configuration = {
      method: 'get',
      url: `${server}/admin-panel`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
        // Change lastLogin
        const formattedUsers = result.data.users.map((user) => ({
          ...user,
          lastLogin: new Date(user.lastLogin).toLocaleString(),
        }));
        setUsers(formattedUsers);
      })
      .catch((error) => {
        console.error(
          'Error:',
          error.response ? error.response.data : error.message
        );
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  //Logout
  const navigate = useNavigate();
  const handleLogout = () => {
    // Delete token from localStorage
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  // User checkbox
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Block users
  const handleBlockUsers = () => {
    if (selectedUsers.length > 0) {
      axios
        .post('https://test4-backend-82s0.onrender.com/block-users', {
          userIds: selectedUsers,
        })
        .then((response) => {
          console.log(response.data);
          // Check if user blocks himself
          const currentUser = localStorage.getItem('userId');
          selectedUsers.includes(currentUser) ? handleLogout() : fetchUsers();
        })
        .catch((error) => {
          console.error('Error blocking users:', error.response);
        });
    }
  };
  // Unlock users
  const handleUnlockUsers = () => {
    if (selectedUsers.length > 0) {
      axios
        .post('https://test4-backend-82s0.onrender.com/unlock-users', {
          userIds: selectedUsers,
        })
        .then((response) => {
          console.log(response.data);
          fetchUsers();
        })
        .catch((error) => {
          console.error('Error unlocking users:', error.response);
        });
    }
  };

  // Delete users
  const handleDeleteUsers = () => {
    if (selectedUsers.length > 0) {
      axios({
        method: 'delete',
        url: 'https://test4-backend-82s0.onrender.com/delete-users',
        data: {
          userIds: selectedUsers,
        },
      })
        .then((response) => {
          console.log(response.data);
          // Check if user deletes himself
          const currentUser = localStorage.getItem('userId');
          selectedUsers.includes(currentUser) ? handleLogout() : fetchUsers();
        })
        .catch((error) => {
          console.error('Error eliminando usuarios:', error.response);
        });
    }
  };
  return (
    <Container className="d-flex flex-column mt-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1>Admin Panel</h1>
        </Col>
        <Col md="auto" xs="auto">
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </Col>
      </Row>
      <div className="d-flex flex-lg-row gap-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleBlockUsers}
          disabled={selectedUsers.length === 0}
        >
          Block
        </Button>
        <Button
          variant="success"
          size="sm"
          onClick={handleUnlockUsers}
          disabled={selectedUsers.length === 0}
        >
          Unlock
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDeleteUsers}
          disabled={selectedUsers.length === 0}
        >
          Delete
        </Button>
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>
              <Form.Check
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedUsers(users.map((user) => user._id));
                  } else {
                    setSelectedUsers([]);
                  }
                }}
                checked={selectedUsers.length === users.length}
              />
            </th>
            <th>Name</th>
            <th>Position</th>
            <th>E-mail</th>
            <th>Last login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Form.Check
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleSelectUser(user._id)}
                />
              </td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.position}</td>
              <td>{user.email}</td>
              <td>{user.lastLogin}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminPanel;
