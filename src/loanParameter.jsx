import { useState } from 'react';
import { createRoot } from 'react-dom/client';


function MyElement() {
    const [principalVal, setPrincipal] =  useState("") ;
    const [interestVal, setInterest] = useState("");
    const [paymentVal, setPayment] = useState("");

    function handlePrincipal(e){
        setPrincipal(e.target.value);
    }
    function handleInterest(e){
        setInterest(e.target.value);
    }
    function handlePayment(e){
        setPayment(e.target.value);
    }

    function monthlyDue(principal, interest, payment)
    {
        
        var amountRemain = [];
        var interestComp;
        var owed;
        principal = Math.floor(principal);
        payment = Math.floor(payment);
        interest = Math.floor(interest);
        if (payment <= principal*(interest/1200))
        {
            amountRemain[0] = "Will never pay off";
            return amountRemain; 
        }
        for (var i = 0; i < 1200; i++)
        {
            interestComp = principal*(interest/1200);
            owed = Math.round((interestComp + Number.EPSILON) * 100)/100;
            principal = (principal+owed) + (payment * -1);
            if (principal <= 0)
            {
                amountRemain[i] = 0;
                break;
            }
            amountRemain[i] = Math.round((principal + Number.EPSILON) * 100)/100;
        }  
        return amountRemain;
    }


    var test;

    return (
    <div>
    <h1>Welcome to Loanscope!</h1>
    <form>
    <label>Starting Principal 
    <input type="range" id="principal" name="principal" value={principalVal} onChange={handlePrincipal} onInput={test=monthlyDue(principalVal, interestVal, paymentVal)} min="1" max="100000000" />
    </label>
    <p>Starting Princpal: ${principalVal}</p>
    </form>
    <form>
    <label><br></br>Annual Interest
    <input type="range" id="interest" name="interest" value={interestVal} onChange={handleInterest} min="0" max="40" />
    </label>
    <p>Annual Interest: {interestVal}%</p>
    </form>
    <form>
    <label><br></br>Monthly Payment
    <input type="range" id="payment" name="payment" value={paymentVal} onChange={handlePayment} min="1" max="1000000" />
    </label>
    <p>Monthly Payments: ${paymentVal}</p>
    {test.map(item => <li>${item}</li>)}
    </form>
    </div>)
}
/*const principleValue = document.getElementById("principleVal");
const principleInput = document.getElementById("principle");
principleInput.addEventListener("change", () => {
    principleValue.innerText = '$ ${principleInput.value}';
});*/
createRoot(document.getElementById('root')).render(<MyElement />);
//createRoot(document.getElementById('root')).render(myForm);
