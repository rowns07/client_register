import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import NavBar from "../Navbar";

type userProps = {

  id: string,
  name: string,
  lastName: string,
  email: string,
  hasAccepted: boolean
}

export function UsersList() {

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 130 },
    { field: 'lastName', headerName: 'Sobrenome', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      width: 150
    },
    {
      field: 'hasAccepted',
      headerName: 'Aceitou o Termo?',
      width: 130
    },
  ];

  const [users, setUsers] = useState<userProps[]>([]);


  const listUsers = async function getUsers() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const response: userProps[] = Object.values(data);
        setUsers(response);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    listUsers();
  }, [])

  return (
    <div id="page-auth">
      <NavBar />
      <Container maxWidth="xl">

        <h2>Usuarios Cadastrados</h2>
        <Box
          component="div"
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <div style={{ height: 500, width: '100%' }}>

            <DataGrid
              rows={users}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            //checkboxSelection
            />

          </div>
        </Box>
      </Container>

    </div>
  );
}
