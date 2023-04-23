import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";

function PatentListing() {

    const [params] = useSearchParams();
    const q = params.get('q');
    const API = `http://api.patentsview.org/patents/query?q={"_text_phrase": {"patent_title":"${q}"}}`;
    const [patents, setPatents] = useState([]);
    useEffect(() => {
        fetch(`${API}`)
            .then((res) => res.json())
            .then((data) => {
                setPatents(data.patents);
                console.log(data.patents);
            })
    }, [])

    function renderPatents()
    {
        return patents.map((patent) => {
            return (
                <div key={patent.patent_id} className='patentListing'>
                    <p>
                        {patent.patent_id}
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