import React from 'react'

export default function ProductsTable({ data }) {
    const allProducts = data.products
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {allProducts.map((el,index) => {
                        let num = index+1
                        return (
                            <tr key={index}>
                                <th scope="row">{num}</th>
                                <td>{el.date}</td>
                                <td>{el.title}</td>
                                <td>{el.price}</td>
                                <td>{el.currency}</td>
                            </tr>
                        )
                    })
                    }

                </tbody>
            </table>
        </div>
    )
}
