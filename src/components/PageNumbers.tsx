import { useState } from "react";
import '../css/PageNumbers.css'

function PageNumbers(props: (any & number)) {
    const { onPageNumberChange, productsLength } = props;
    const [firstIndex, setFirstIndex] = useState(1);
    const [lastIndex, setlastIndex] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageNumberArray, setPageNumberArray] = useState([...Array(11)].map((_, idx) => idx).filter(e => e !== 0))
    const pageNumbersLimit = Math.ceil(productsLength / 12);
    const onPageChange = (index: number) => {
        setPageNumber(index);
        onPageNumberChange(index);
    }
    const getRange = (start: number, end: number) => {
        const startIndex = start === 0 ? 1 : start;
        const endIndex = end === productsLength ? end - 1 : end;
        return [...Array(endIndex - startIndex + 1)].map((_, idx) => start + idx).filter(e => e !== 0)
    }

    const onNext = (index: number) => {
        setPageNumber(index);
        if (index - 1 === lastIndex) {
            setlastIndex(lastIndex + 1);
            setFirstIndex(firstIndex + 1);
            setPageNumberArray(getRange(firstIndex + 1, lastIndex + 1));
        } else {
            setPageNumberArray(getRange(firstIndex, lastIndex));
        }
        onPageNumberChange(index);
    }

    const onPrevious = (index: number) => {
        setPageNumber(index);
        if (index + 1 === firstIndex) {
            setlastIndex(lastIndex - 1);
            setFirstIndex(firstIndex - 1 === 0 ? 1 : firstIndex - 1);
            setPageNumberArray(getRange(firstIndex - 1 === 0 ? 1 : firstIndex - 1, lastIndex - 1));
        } else {
            setPageNumberArray(getRange(firstIndex, lastIndex));
        }
        onPageNumberChange(index);
    }

    return (
        <nav className="pageNav" aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
                <li className={`page-item  ${pageNumber === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" aria-disabled="false" onClick={() => onPrevious(pageNumber - 1)}>Previous</a>
                </li>
                {[...pageNumberArray].map(index => (
                    <li className={`page-item ${index === pageNumber ? 'active' : ''}`} onClick={() => onPageChange(index)}><a className="page-link">{index}</a></li>
                ))}
                <li className={`page-item  ${pageNumber === pageNumbersLimit ? 'disabled' : ''}`}>
                    <a className="page-link" onClick={() => onNext(pageNumber + 1)}>Next</a>
                </li>
            </ul>
        </nav>
    )
}

export default PageNumbers;
