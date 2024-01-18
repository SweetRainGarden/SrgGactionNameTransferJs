const core = require('@actions/core');

try {
  const breakDownString = (str) => {
    let sections = [];
    let currentSection = "";
    for (let i = 0; i < str.length; i++) {
      let isUppercaseLetter = isNaN(str[i]) && str[i].toUpperCase() === str[i];
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

  let plugin_id = "";
  let plugin_type = sections[1]

  for (let i = 0; i < sections.length - 1; i++) {

    if (i > 1) {
      plugin_id += sections[i];
    }

    if (i > 1 && i < sections.length - 2) {
      plugin_id += '-';
    }
  }
  core.setOutput('plugin_org', sections[0]);
  core.setOutput('plugin_id', plugin_id);
  core.setOutput('name_prefix', sections[0]);
  core.setOutput('name_suffix', sections[sections.length - 1]);
  core.setOutput('full_com_plugin_format', "com." + sections[0] + "." + plugin_type + ":" + plugin_id);


} catch (error) {
  core.setFailed(error.message);
}
