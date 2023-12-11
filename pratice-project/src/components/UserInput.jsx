export default function UserInput({setInitialInvestment,setAnnualInvestment,setExpectedReturn,setDuration}) {
    return <section id='user-input'>
        <div className='input-group'>
            <p>
                <label htmlFor="initialInvestment">INITIAL INVESTMENT</label>
                <input value={initialInvestment} onChange={(event) => setInitialInvestment(event.target.value)} id="initialInvestment" type="number" />
            </p>
            <p >
                <label htmlFor="annualInvestment">ANNUAL INVESTMENT</label>
                <input value={annualInvestment} onChange={(event) => setAnnualInvestment(event.target.value)} id="annualInvestment" type="number" />
            </p>
            <p>
                <label htmlFor="expectedReturn">EXPECTED RETURN</label>
                <input value={expectedReturn} onChange={(event) => setExpectedReturn(event.target.value)} id="expectedReturn" type="number" />
            </p>
            <p>
                <label htmlFor="duration">DURATION</label>
                <input value={duration} onChange={(event) => setDuration(event.target.value)} id="duration" type="number" />
            </p>
        </div>
    </section>
}