import { useEffect, useState } from "react";

export const useSearch = (query, options, format) => {
    const API = `https://api.patentsview.org/patents/query?q=${JSON.stringify(query)}&o=${JSON.stringify(options)}&f=${JSON.stringify(format)}`;
    const [patents, setPatents] = useState([]);
    useEffect(() => {
        fetch(`${API}`)
            .then((res) => res.json())
            .then((data) => {
                data.patents?.map((patent) => {
                    patent.pdfUrl = "https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/" + patent.patent_id;
                });
                setPatents(data.patents);
            })
    }, [query, options, format])

    return patents;
}