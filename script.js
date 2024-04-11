document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("mainForm"); 
  const GrossIncome =  document.getElementById("grossIncome");
  const ExtraIncome = document.getElementById("extraIncome");
  const Deductions = document.getElementById( "deductions" );
  const Age = document.getElementById("age")

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(checkInputs()){
        CalculateTax();
    }
  });

  GrossIncome.addEventListener('input', () => {
    validateField(GrossIncome, isGrossIncome(GrossIncome.value.trim()), 'Gross Annual Income cannot be empty or contain non-numeric characters.');
  });

  ExtraIncome.addEventListener('input', () => {
    validateField(ExtraIncome, isExtraIncome(ExtraIncome.value.trim()), 'Extra Income cannot be empty or contain non-numeric characters.');
  });

  Deductions.addEventListener('input', () => {
    validateField(Deductions, isDeductions(Deductions.value.trim()  ), 'Deductions cannot be empty or contain non-numeric characters.');
  });
  
  Age.addEventListener('input', () => {
    validateField(Age, (Age.value.trim() !== ''), 'Select Your Age.');
  });

  function checkInputs(){
    let isValid=true;
    validateField(GrossIncome, isGrossIncome(GrossIncome.value.trim()), 'Gross Annual Income cannot be empty or contain non-numeric characters.');

    validateField(ExtraIncome, isExtraIncome(ExtraIncome.value.trim()), 'Extra Income cannot be empty or contain non-numeric characters.');

    validateField(Deductions, isDeductions(Deductions.value.trim()  ), 'Deductions cannot be empty or contain non-numeric characters.');

    validateField(Age, (Age.value.trim() !== ''), 'Select Your Age.');

    document.querySelectorAll('.form-control').forEach((control) =>{
        if (control.classList.contains('error')){
            isValid=false;
        }
    })
    return isValid;
  }


  function isGrossIncome(GrossIncome){
    return /^[0-9]+$/.test(GrossIncome) && GrossIncome.trim() !== '';
  }

function isExtraIncome(ExtraIncome){
    return /^[0-9]+$/.test(ExtraIncome) && ExtraIncome.trim() !== '';
  }

function isDeductions(Deductions){
    return /^[0-9]+$/.test(Deductions) && Deductions.trim() !== '';
  }

  function  validateField( input, condition, errorMessage ) {
    if(condition){
        setSuccess(input);
    }
    else{
        setError(input, errorMessage);
    }
  }

  function setError(input, message) {
    const formControl = input.parentNode;
    const icon = formControl.querySelector('.icon');
    formControl.className = 'form-control error';
    icon.className = 'icon fas fa-times-circle';
    input.placeholder = message;
}

function setSuccess(input) {
    const formControl = input.parentNode;
    const icon = formControl.querySelector('.icon');
    formControl.className = 'form-control success';
    icon.className = 'icon fas fa-check-circle';
}


  function showModal(){
    const modal= document.getElementById("TaxModal");
    modal.style.display='block';

    const closeBtn = document.querySelector('.close-button')
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };
    
    window.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
    }
  }


  function CalculateTax() {
    const grossIncome = parseFloat(GrossIncome.value);
    const extraIncome = parseFloat(ExtraIncome.value);
    const deductions = parseFloat(Deductions.value);
    const age = Age.value;

    const totalIncome = grossIncome + extraIncome - deductions;
    let taxableIncome = 0;
    let taxRate = 0;

    if (totalIncome <= 800000) {
        taxableIncome = 0;
        taxRate = 0;
    } else {
        taxableIncome = totalIncome - 800000;

        if (age === 'less40') {
            taxRate = 0.3;
        } else if (age === 'less60') {
            taxRate = 0.4;
        } else if (age === 'great60') {
            taxRate = 0.1;
        }
    }

    const taxAmount = taxableIncome * taxRate;
    const overallIncome = totalIncome - taxAmount;
    // console.log(taxAmount);
    showModal();
    document.getElementById('overAllIncome').innerHTML = `₹ ${overallIncome.toFixed(2)}`; 
    document.getElementById('taxableIncome').textContent = `₹ ${taxableIncome.toFixed(2)}`;
    document.getElementById('taxAmount').textContent = `₹ ${taxAmount.toFixed(2)}`;
}


})



