import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useState} from "react";

export default function Dashboard({auth, users}) {
    const [count, setCount] = useState(0);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                        <button type="button"
                                className="px-5 py-3 m-5 bg-blue-600 text-white hover:bg-blue-500 rounded-md shadow-md shadow-gray-500"
                                onClick={() => setCount(count + 1)}>
                            Count is: {count}
                        </button>

                        {
                            users.map((user) => (
                                <div key={user.id} className="p-6 bg-white border-b border-gray-200">
                                    {user.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
