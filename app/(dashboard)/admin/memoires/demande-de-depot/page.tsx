import { Memory, Payment, columns } from "./columns"
import { DemandeDepotMemoireDataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // ...
  ]
}

async function getMemoryData(): Promise<Memory[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1001,
      theme: 'Theme du mémoire 1',
      status: "pending",
      soutenance_date: '2017-09-25',
      soutenance_hour: "10:15",
      first_author_name: "Adrien",
      second_author_name: "George",
      first_author_email: "a.@gmail.com",
      second_author_email: "g@gmail.com",
      first_author_phone: "90909090",
      second_author_phone: "15151515",
      jury_president: "Moussa",
      memory_master: "Comlan",
      memory_year: "2017",
      file_path: "------------------------",
      cote: "2017/15/48",
      created_at: "2017-09-25",
      updated_at: "2017-09-25",
      deleted_at: "2017-09-25",
      created_by: "admin",
      updated_by: "admin",
      deleted_by: "admin"
    },
    {
      id: 1001,
      theme: 'Theme du mémoire 2',
      status: "pending",
      soutenance_date: '2017-09-25',
      soutenance_hour: "10:15",
      first_author_name: "Adrien",
      second_author_name: "George",
      first_author_email: "a.@gmail.com",
      second_author_email: "g@gmail.com",
      first_author_phone: "90909090",
      second_author_phone: "15151515",
      jury_president: "Moussa",
      memory_master: "Comlan",
      memory_year: "2019",
      file_path: "------------------------",
      cote: "2017/15/48",
      created_at: "2017-09-25",
      updated_at: "2017-09-25",
      deleted_at: "2017-09-25",
      created_by: "admin",
      updated_by: "admin",
      deleted_by: "admin"
    },
    {
      id: 1001,
      theme: 'Theme du mémoire 3',
      status: "pending",
      soutenance_date: '2017-09-25',
      soutenance_hour: "10:15",
      first_author_name: "Adrien",
      second_author_name: "George",
      first_author_email: "a.@gmail.com",
      second_author_email: "g@gmail.com",
      first_author_phone: "90909090",
      second_author_phone: "15151515",
      jury_president: "Moussa",
      memory_master: "Comlan",
      memory_year: "2020",
      file_path: "------------------------",
      cote: "2017/15/48",
      created_at: "2017-09-25",
      updated_at: "2017-09-25",
      deleted_at: "2017-09-25",
      created_by: "admin",
      updated_by: "admin",
      deleted_by: "admin"
    },
    {
      id: 1001,
      theme: 'Theme du mémoire 4',
      status: "pending",
      soutenance_date: '2017-09-25',
      soutenance_hour: "10:15",
      first_author_name: "Adrien",
      second_author_name: "George",
      first_author_email: "a.@gmail.com",
      second_author_email: "g@gmail.com",
      first_author_phone: "90909090",
      second_author_phone: "15151515",
      jury_president: "Moussa",
      memory_master: "Comlan",
      memory_year: "2022  ",
      file_path: "------------------------",
      cote: "2017/15/48",
      created_at: "2017-09-25",
      updated_at: "2017-09-25",
      deleted_at: "2017-09-25",
      created_by: "admin",
      updated_by: "admin",
      deleted_by: "admin"
    },
    // ...
  ]
}

const DemandeDeDepotMemoire = async () => {
  const data = await getMemoryData()

  return (
    <div className="container mx-auto py-10">
      Liste des dépôts de mémoires
      <DemandeDepotMemoireDataTable columns={columns} data={data} />
    </div>
  )
}

export default DemandeDeDepotMemoire