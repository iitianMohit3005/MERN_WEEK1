import React,{useState,useEffect} from 'react';
import {toast} from "react-toastify";
import {getNames, createName } from "./api";
import {Link} from "react-router-dom";
import FormElement from "./form";
import Loading from "./loading";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";


const Crud=()=>{
    const [name, setName]= useState("");
    const [loading, setLoading]= useState(false);
    const [names, setNames]= useState([]);

    useEffect(()=>{
        loadNames();
    },[]);

    console.log("process.env.REACT_APP_API",process.env.REACT_APP_API);

    const loadNames=()=> getNames().then((name)=>setNames(name.data));

    const handleSubmit=(e)=>{
            e.preventDefault();
            setLoading(true);
            createName({name}).then((res)=>{
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} is created`);
                loadNames();

            }).catch((err)=>{
                setLoading(false);
                if (err.response.status===400) toast.error(err.response.data);
            });
    };
    return(
        <div className="container-fluid">
            <div classsName="row">
                <div className="col-md-8">
                    {loading ? (
                    <Loading/>
                    ):(
                    <>
                        <h4 className="text-center">Crud with JSON Server</h4>
                        <FormElement 
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                        />
                    {names && 
                      names.map((t)=>(
                        <div className="border row mx-2 align-items-center" key={t.id}>
                            <ul className="list-group">
                                <li className="list-group-item">{t.name}</li>
                            </ul>
                            <span
                            onClick={()=>console.log("")}
                            className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-danger"/>
                            </span>
                            <Link to={`/update/${t.id}`}>
                            <span
                            onClick={()=>console.log("")}
                            className="btn btn-sm float-right"
                            >
                                <EditOutlined className="text-warning"/>
                            </span>
                            </Link>
                        </div>
                    ))}
                 </>
                )}
                </div>
            </div>
        </div>
    );
};

export default Crud;