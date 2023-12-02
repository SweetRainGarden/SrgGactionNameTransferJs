const core = require('@actions/core');

try {
  const breakDownString = (str) => {
    let sections = [];
    let currentSection = "";
    for (let i = 0; i < str.length; i++) {
        let isUppercaseLetter =  isNaN(str[i]) && str[i].toUpperCase() === str[i];
        let charToAdd = isUppercaseLetter ? str[i].toLowerCase() : str[i];

        if (str[i] === '-' || isUppercaseLetter) {
            if (currentSection !== "") {
                sections.push(currentSection);
            }
            if (isUppercaseLetter) {
                currentSection = charToAdd;
            }
            
        } else {
            currentSection += charToAdd;
        }
    }
    if (currentSection !== "") {
        sections.push(currentSection);
    }
    return sections;
  };

  const sections = breakDownString(core.getInput('inputString'));
  if (sections.length < 3) {
    throw new Error("String doesn't have enough sections to process");
  }

  let result = "com.";
  for (let i = 0; i < sections.length -1; i++) {
    result += sections[i];
    if (i < sections.length - 2) {
        result += '.';
    }
}
  core.setOutput('plugin_org', sections[0]);
  core.setOutput('plugin_id', result);
  
} catch (error) {
  core.setFailed(error.message);
}
