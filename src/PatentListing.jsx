import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";

function PatentListing() {


    const [params] = useSearchParams();
    const query = params.get('q');
    const q =
    {
        "_text_phrase": {
            "patent_title": query
        }
    }
    const f =
        [
            "patent_title",
            "patent_id",
            "inventor_first_name",
            "inventor_last_name",
            "patent_date",
        ]
    const API = `https://api.patentsview.org/patents/query?q=${JSON.stringify(q)}&f=${JSON.stringify(f)}`;
    const PDF_API = `https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/`;
    const [patents, setPatents] = useState([]);
    useEffect(() => {
        fetch(`${API}`)
            .then((res) => res.json())
            .then((data) => {
                setPatents(data.patents);
            })
    }, [])

    function renderPatents() {
        return patents.map((patent) => {
            return (
                <div key={patent.patent_id} className='patentListing'>
                    <h3>
                        {patent.patent_title}
                    </h3>
                    <p>
                        <b>Patent Number:</b> {patent.patent_id}
                    </p>
                    <p>
                        <b>Inventors:</b>
                        {
                            patent.inventors.map((inventor) => {
                                const isNotLast = inventor !== patent.inventors[patent.inventors.length - 1];
                                let commaIfNotLast = isNotLast ? ',' : '';
                                return ` ${inventor.inventor_first_name} ${inventor.inventor_last_name}` + commaIfNotLast;
                            })
                        }
                    </p>
                    <p>
                        Link to PDF: <a target='_blank' href={PDF_API + patent.patent_id}>PDF</a>
                    </p>
                </div>
            );
        })
    }
    return (
        <>
            <NavBar />
            <div id='patentListings'>
                {patents ? renderPatents() : 'No Patents Found'}
            </div>
        </>
    );
}

export default PatentListing;