import React, { useState } from 'react';

const Home = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: ""
    });

    const [tableData, setTableData] = useState([]);

    const [editClick, setEditClick] = useState(false);

    const [editIndex, setEditIndex] = useState("");

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("inputs", inputs);
        if(editClick){
            const updatedData = tableData;
            Object.assign(updatedData[editIndex], inputs);
            setTableData([...updatedData]);
            setEditClick(false);
            setInputs({
                name: "",
                email: ""
            });

        }else{
            setTableData([...tableData, inputs]);
            setInputs({
                name: "",
                email: ""
            });
        }
    }
    console.log("tableData", tableData);

    const handleDelete = (index) => {
        const filterData = tableData.filter((item, i) => i !== index)
        setTableData(filterData);
    }

    const handleEdit = (index) => {
        const tempData = tableData[index]
        setInputs({name: tempData.name, email: tempData.email});
        setEditClick(true);
        setEditIndex(index);
    }
    return (
        <div>
            <h1>Crud App</h1>
            <div className='add-form'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name : </label>
                        <input type='text' name='name' value={inputs.name} onChange={handleChange} />
                    </div>
                    <br />
                    <div>
                        <label>Email : </label>
                        <input type='text' name='email' value={inputs.email} onChange={handleChange} />
                    </div>
                    <br />
                    <button type='submit'>{editClick ? "Update" : "Add"}</button>
                </form>
            </div>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>Name : </th>
                            <th>Email : </th>
                            <th>Action : </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((item, i ) => {
                              return  <tr>
                                    <td>{item.name} </td>
                                    <td>{item.email} </td>
                                    <td>
                                      <button onClick={() => handleEdit(i)} className='edit'>Edit</button>
                                    <button onClick={() => handleDelete(i)} className='delete'>Delete</button>
                                    <hr />
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;
