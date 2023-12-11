export default function Results({result}) {
    return <table id='result' >
        <thead>
            <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest (year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
            </tr>
        </thead>
        <tbody>
            {result.map((e) => (<tr>
                <td>{e.year}</td>
                <td>{formatter.format(e.interest)}</td>
                <td>{formatter.format(e.valueEndOfYear)}</td>
                <td>{formatter.format(e.annualInvestment)}</td>
                <td>{formatter.format(0)}</td>

            </tr>))}
        </tbody>
    </table>
}