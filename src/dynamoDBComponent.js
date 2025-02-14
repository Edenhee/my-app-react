import React, { useEffect, useState } from "react";
import fetchDynamoDBData from "./dynamoDB"; // Import the DynamoDB fetch function

function DynamoDBComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            const result = await fetchDynamoDBData();
            setData(result);
        }
        getData();
    }, []);

    return (
        <div>
            <h2>Latest 10 Records from DynamoDB</h2>
            {data.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Device ID</th>
                            <th>Epoch Time</th>
                            <th>%DO</th>
                            <th>DO Conc</th>
                            <th>EC</th>
                            <th>NTU</th>
                            <th>pH</th>
                            <th>Temp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item["Device ID"]}</td>
                                <td>{item["Epoch Time"]}</td>
                                <td>{item["%DO"]}</td>
                                <td>{item["DO Conc"]}</td>
                                <td>{item["EC"]}</td>
                                <td>{item["NTU"]}</td>
                                <td>{item["pH"]}</td>
                                <td>{item["Temp"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default DynamoDBComponent;
