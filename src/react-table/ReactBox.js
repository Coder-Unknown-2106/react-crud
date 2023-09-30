import React from "react";
import DataTable from "react-data-table-component";
import movies from "./movies";

export default function ReactBox() {
    const loggedUser = JSON.parse(localStorage.getItem('logged'))

    const getAllProducts = JSON.parse(localStorage.getItem(`${loggedUser.userName} products`))

    const columns = [
        {
            id: 1,
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            reorder: true
        },
        {
            id: 2,
            name: "Director",
            selector: (row) => row.director,
            sortable: true,
            reorder: true
        },
        {
            id: 3,
            name: "Runtime (m)",
            selector: (row) => row.runtime,
            sortable: true,
            right: true,
            reorder: true
        }
    ];

    return (
        <div className="App">

            <DataTable
                title="Movies"
                columns={columns}
                data={movies}
                defaultSortFieldId={1}
                pagination
                selectableRows

            />
        </div>
    );
}

