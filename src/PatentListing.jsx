function PatentListing({ patent }) {
    return (
        <div className='patentListing'>
            <h3>
                {patent.patent_title}
            </h3>
            <p>
                <b>Patent Number:</b> {patent.patent_id}
            </p>
            <p>
                <b>Date:</b> {patent.patent_date}
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
                <b>Link to PDF:</b> <a target='_blank' href={patent.pdfUrl}>PDF</a>
            </p>
        </div>
    );
}

export default PatentListing;