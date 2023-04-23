import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
    return (
        <>
            <div id='patentListings'>
                {
                    patents.map((patent) => {
                        return (
                            <div key={patent.patent_id} className='patentListing'>
                                {`${patent.patent_id} ${patent.patent_title}`}
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default PatentListing;