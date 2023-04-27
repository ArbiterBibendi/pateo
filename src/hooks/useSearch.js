import { useEffect, useState } from "react";

export const useSearch = (query, format) => {
    const API = `https://api.patentsview.org/patents/query?q=${JSON.stringify(query)}&f=${JSON.stringify(format)}`;
    const [patents, setPatents] = useState([]);
    useEffect(() => {
        fetch(`${API}`)
            .then((res) => res.json())
            .then((data) => {
                setPatents(data.patents);
            })
    }, [query, format])

    return patents;
}