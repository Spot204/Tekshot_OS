import Input from './components/ui/Input'
import DateInput from './components/ui/DateInput'
import { useState } from 'react'
import Table from './components/ui/Table'

interface User {
    id: number;
    name: string;
    email: string;
}

const users: User[] = [
    { id: 1, name: "An", email: "an@example.com" },
    { id: 2, name: "Bình", email: "binh@example.com"}
];

import Sidebar from "./layout/Sidebar";
import Header from "./components/layout/Header";
function App() {
    const [date, setDate] = useState<Date | null>(null);

    return (
        <div className="row g-2 m-3">
            <div className="col-6"><Input placeholder="Không icon"/></div>
            <div className="col-6"><Input placeholder="Tìm kiếm" leftIcon={<i className="bi bi-search"/>} state="success"/></div>
            <div className="col-6">
                <Input
                    placeholder="Email"
                    state="error"
                    message="Email không đúng định dạng"
                    leftIcon={<i className="bi bi-envelope" />}
                />
            </div>

            <div className="col-6"><DateInput selected={date} onChange={setDate} /></div>
            <div className="col-6"><Input placeholder="Tên" /></div>
            <div className="col-6"><Input placeholder="Email" /></div>
            <div className="col-6"><Input placeholder="SĐT" /></div>
            <div className="col-6"><Input placeholder="Địa chỉ" /></div>

            <div>
                <Table<User>
                    columns={[
                        { key: "name", header: "Tên" },
                        { key: "email", header: "Email" },
                    ]}
                    data={users}
                    rowKey="id"
                />
            </div>
        </div>

        
    )
}

export default App