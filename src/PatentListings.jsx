import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useSearch } from "./hooks/useSearch";
import PatentListing from "./PatentListing";

function PatentListings() {


    const [params] = useSearchParams();
    const patenttitle = params.get('q');
    let currentPage = Number(params.get('p') || 1);
    currentPage = Math.max(1, currentPage);

    const [query, setQuery] = useState( getQuery(params) );
    const [options, setOptions] = useState(
        {
            "page": currentPage
        });
    const [format, setFormat] = useState(
        [
            "patent_title",
            "patent_id",
            "inventor_first_name",
            "inventor_last_name",
            "patent_date",
            "patent_date"
        ]);
    const patents = useSearch(query, options, format);
    const PDF_API = `https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/`;


    function getQuery(params)
    {
        const q = params.get('q');
        let finalQuery = "";
        if (params.get('searchby') == 'inventor'){
            let lastSpaceIndex = q.lastIndexOf(' ');
            if (lastSpaceIndex == -1){
                finalQuery =  {"_eq": {"inventor_last_name": q} }
            }
            else{
                let lastName = q.slice(lastSpaceIndex+1)
                let firstName = q.slice(0, lastSpaceIndex);
                finalQuery = {"_and": [
                    {"_contains": {"inventor_first_name": firstName}},
                    {"_contains": {"inventor_last_name": lastName}}
                ]}
            }
        }
        else
        {
            finalQuery = {"_text_phrase": {
                "patent_title": q
            }}
        }
        return finalQuery;
    }
    function changePage(delta) {
        setOptions((currentOptions) => {
            let currentPage = currentOptions["page"];
            const newOptions = {
                "page": currentPage + delta
            }
            return newOptions;
        });
    }
    function nextPage() {
        changePage(1)
    }
    function prevPage() {
        changePage(-1)
    }
    function renderPatents() {
        return patents.map((patent) => {
            return (
                <PatentListing key={patent.patent_id} patent={patent} />
            );
        })
    }
    return (
        <>
            <NavBar />
            <div id='patentListings'>
                <div id='pageButtons'>
                    <button className='pageButton' onClick={prevPage} disabled={options.page <= 1}>-</button>
                    <p id='currentPage'>Page {options['page']}</p>
                    <button className='pageButton' onClick={nextPage}>+</button>
                </div>
                {patents ? renderPatents() : 'No Patents Found'}
            </div>
        </>
    );
}

export default PatentListings;