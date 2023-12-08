import { useState } from 'react'
import { calculateInvestmentResults, formatter } from './util/investment'
import React from 'react'
import { useEffect } from 'react'
import Header from './components/Header'

function App() {

  const [initialInvestment, setInitialInvestment] = useState(15000);
  const [annualInvestment, setAnnualInvestment] = useState(900);
  const [expectedReturn, setExpectedReturn] = useState(6);
  const [duration, setDuration] = useState(10);
  const [result, setResult] = useState([]);



  useEffect(() => {
    const resultado = calculateInvestmentResults({ initialInvestment, annualInvestment, expectedReturn, duration });
    setResult(resultado);
  }, [initialInvestment, annualInvestment, expectedReturn, duration]);

  let teste = 0;

  if (result.length) {
    teste = result[0].valueEndOfYear - result[0].interest - result[0].annualInvestment;
  }

  const isInputValid = duration >= 1

  return (
    <>
      <Header />
      <section id='user-input'>
        <div className='input-group'>
          <p>
            <label htmlFor="initialInvestment">INITIAL INVESTMENT</label>
            <input value={initialInvestment} onChange={(event) => setInitialInvestment(event.target.valueAsNumber)} id="initialInvestment" type="number" />
          </p>
          <p >
            <label htmlFor="annualInvestment">ANNUAL INVESTMENT</label>
            <input value={annualInvestment} onChange={(event) => setAnnualInvestment(event.target.valueAsNumber)} id="annualInvestment" type="number" />
          </p>
        </div>
        <div className='input-group'>
          <p>
            <label htmlFor="expectedReturn">EXPECTED RETURN</label>
            <input value={expectedReturn} onChange={(event) => setExpectedReturn(event.target.valueAsNumber)} id="expectedReturn" type="number" />
          </p>
          <p>
            <label htmlFor="duration">DURATION</label>
            <input value={duration} onChange={(event) => setDuration(event.target.valueAsNumber)} id="duration" type="number" />
          </p>
        </div>
   
      </section>
      <table id='result' >
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
  
         {isInputValid && <tbody>
          {result.map((e) => {

            const totalInterest = e.valueEndOfYear - e.annualInvestment * e.year - teste;
            const totalAmountInvested = e.valueEndOfYear - totalInterest;

            return (<tr>
              <td>{e.year}</td>
              <td>{formatter.format(e.valueEndOfYear)}</td>
              <td>{formatter.format(e.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>)
          })}
        </tbody>}
        
        
      </table>
    </>
  )
}

export default App
