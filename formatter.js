const Jetty = require("jetty");;
const { PrettyFormatter } = require('cucumber');
const DataTable = require('cucumber/lib/models/step_arguments/data_table').default;
const DocString = require('cucumber/lib/models/step_arguments/doc_string').default;

class ShowAndTellFormatter extends PrettyFormatter {
  constructor(options) {
    super(options);

    this.jetty = new Jetty(this.stream);
  }

  setFeatureState(feature, stepResults) {
    this.jetty.clear();

    this.feature = feature;
    this.stepResults = stepResults;

    this.renderFeature(feature);
  }

  renderFeature(feature) {
    super.handleBeforeFeature(feature);

    this.renderScenarios(feature.scenarios);
  }

  renderScenarios(scenarios) {
    scenarios.forEach(this.renderScenario, this);
  }

  renderScenario(scenario) {
    super.handleBeforeScenario(scenario);
    this.renderSteps(scenario.steps);
    this.handleAfterScenario();
  }

  renderSteps(steps) {
    steps.forEach(this.renderStep, this);
  }

  renderStep(step) {
    const stepResult = this.stepResults.find(result => result.step === step);
    const status = stepResult ? stepResult.status : null;
    const colorFn = this.colorFns[status || 'location'];
    const symbol = PrettyFormatter.CHARACTERS[status || 'skipped'];
    const identifier = colorFn(symbol + ' ' + step.keyword + (step.name || ''));

    this.logIndented(identifier + '\n', 1);

    step.arguments.forEach(arg => {
      let str;
      if (arg instanceof DataTable) {
        str = this.formatDataTable(arg);
      } else if (arg instanceof DocString) {
        str = this.formatDocString(arg);
      } else {
        throw new Error('Unknown argument type: ' + arg);
      }
      this.logIndented(colorFn(str) + '\n', 3)
    })
  }

  handleBeforeFeature(feature) {
    this.setFeatureState(feature, []);
  }

  handleBeforeScenario(scenario) {

  }

  handleStepResult(stepResult) {
    this.setFeatureState(this.feature, this.stepResults.concat(stepResult));
  }
}

module.exports = ShowAndTellFormatter;