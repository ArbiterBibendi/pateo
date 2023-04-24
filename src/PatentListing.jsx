import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";

function PatentListing() {

    const [params] = useSearchParams();
    const q = params.get('q');
    const API = `https://api.patentsview.org/patents/query?q={"_text_phrase": {"patent_title":"${q}"}}`;
    const [patents, setPatents] = useState([]);
    useEffect(() => {
        fetch(`${API}`)
            .then((res) => res.json())
            .then((data) => {
                setPatents(data.patents);
            })
    }, [])

    function renderPatents()
    {
        return patents.map((patent) => {
            return (
                <div key={patent.patent_id} className='patentListing'>
                    <p>
                        Patent Number: <b>{patent.patent_id}</b>
                    </p>
                    {patent.patent_title}
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