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
  let middleSection=""
  for (let i = 0; i < sections.length -1; i++) {
    result += sections[i];
    middleSection += sections[i]
    if (i < sections.length - 2) {
        result += '.';
        middleSection += '.';
    }
}
  core.setOutput('plugin_org', sections[0]);
  core.setOutput('plugin_id', result);
  core.setOutput('name_prefix', sections[0]);
  core.setOutput('name_suffix', sections[sections.length - 1]);
  core.setOutput('name_middle_section', middleSection);

  
} catch (error) {
  core.setFailed(error.message);
}
