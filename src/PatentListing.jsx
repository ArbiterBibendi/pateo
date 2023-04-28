import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useSearch } from "./hooks/useSearch";

function PatentListing() {


    const [params] = useSearchParams();
    const patenttitle = params.get('q');
    let currentPage = Number(params.get('p') || 1);
    currentPage = Math.max(1, currentPage);
    
    const [query, setQuery] = useState(
        {
            "_text_phrase": {
                "patent_title": patenttitle
            }
        });
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
        ]);
    const patents = useSearch(query, options, format);
    const PDF_API = `https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/`;



    function nextPage() {
        setOptions((currentOptions) => { 
            let currentPage = currentOptions["page"];
            const newOptions = { 
                "page": currentPage + 1 
            }
            return newOptions;
        });
    }
    function prevPage() {
        setOptions((currentOptions) => { 
            let currentPage = currentOptions["page"];
            const newOptions = { 
                "page": currentPage - 1 
            }
            return newOptions;
        });
    }
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
                        <>
                            {
                                patent.inventors.length > 1 ? <b>Inventors:</b> : <b>Inventor:</b>
                            }
                            {
                                patent.inventors.map((inventor) => {
                                    const isNotLast = inventor !== patent.inventors[patent.inventors.length - 1];
                                    let commaIfNotLast = isNotLast ? ',' : '';
                                    return (` ${inventor.inventor_first_name} ${inventor.inventor_last_name}` + commaIfNotLast);
                                })
                            }
                        </>
                    </p>
                    <p>
                        Link to PDF: <a target='_blank' href={patent.pdfUrl}>PDF</a>
                    </p>
                </div>
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

export default PatentListing;