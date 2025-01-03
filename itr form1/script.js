// script.js
function generateJSON() {
    const formData = {
        "ITR": {
            "ITR1": {
                "PersonalInfo": {
                    "AssesseeName": {
                        "FirstName": document.getElementById("firstName").value,
                        "MiddleName": document.getElementById("middleName").value,
                        "SurNameOrOrgName": document.getElementById("surNameOrOrgName").value
                    },
                    "PAN": document.getElementById("pan").value,
                    "AadhaarCardNo": document.getElementById("aadhaarCardNo").value,
                    "DOB": document.getElementById("dob").value,
                    "MobileNo": document.getElementById("mobileNo").value,
                    "EmailAddress": document.getElementById("emailAddress").value
                },
                "Address": {
                    "ResidenceName": document.getElementById("residenceName").value,
                    "CityOrTownOrDistrict": document.getElementById("cityOrTownOrDistrict").value,
                    "StateCode": document.getElementById("stateCode").value,
                    "PinCode": parseInt(document.getElementById("pinCode").value)
                },
                "ITR1_IncomeDeductions": {
                    "GrossSalary": parseFloat(document.getElementById("grossSalary").value),
                    "NetSalary": parseFloat(document.getElementById("netSalary").value),
                    "IncomeOthSrc": parseFloat(document.getElementById("incomeFromOtherSources").value)
                },
                "DeductUndChapVIA": {
                    "Section80C": parseFloat(document.getElementById("section80C").value),
                    "Section80D": parseFloat(document.getElementById("section80D").value),
                    "Section80TTA": parseFloat(document.getElementById("section80TTA").value)
                }
            }
        }
    };

    const jsonContent = JSON.stringify(formData, null, 4);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ITR_Form.json";
    link.click();
}
