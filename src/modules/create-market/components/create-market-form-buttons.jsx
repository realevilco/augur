import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import newMarketCreationOrder from 'modules/create-market/constants/new-market-creation-order';
import { NEW_MARKET_OUTCOMES } from 'modules/create-market/constants/new-market-creation-steps';
import { BINARY } from 'modules/markets/constants/market-types';

export default class CreateMarketFormButtons extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    currentStep: PropTypes.number.isRequired,
    isValid: PropTypes.bool.isRequired,
    validations: PropTypes.array.isRequired,
    addValidationToNewMarket: PropTypes.func.isRequired,
    removeValidationFromNewMarket: PropTypes.func.isRequired,
    updateNewMarket: PropTypes.func.isRequired,
    newMarket: PropTypes.object.isRequired,
    submitNewMarket: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      nextButtonCopy: '',
      nextStep: null
    };

    this.updateNextButtonCopy = this.updateNextButtonCopy.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.updateFormButtonHeight = this.updateFormButtonHeight.bind(this);
  }

  componentWillMount() {
    this.updateNextButtonCopy(this.props.currentStep, this.props.validations);
  }

  componentDidMount() {
    this.updateFormButtonHeight(this.props.currentStep);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isValid !== nextProps.isValid) {
      if (nextProps.isValid) {
        nextProps.addValidationToNewMarket(newMarketCreationOrder[nextProps.currentStep]);
      } else {
        nextProps.removeValidationFromNewMarket(newMarketCreationOrder[nextProps.currentStep]);
      }
    }

    if (this.props.currentStep !== nextProps.currentStep ||
        this.props.validations !== nextProps.validations
    ) {
      console.log('validations changed');
      this.updateNextButtonCopy(nextProps.currentStep, nextProps.validations);
    }

    if (this.props.currentStep !== nextProps.currentStep) this.updateFormButtonHeight(nextProps.currentStep);
  }

  updateNextButtonCopy(currentStep, validations) {
    let nextButtonCopy = newMarketCreationOrder.find(step => !validations.find(validStep => step === validStep));

    if (currentStep === newMarketCreationOrder.length - 1) {
      nextButtonCopy = 'Create Market';
      this.props.updateNewMarket({ isValid: true });
    } else if (nextButtonCopy === newMarketCreationOrder[currentStep] &&
      currentStep !== newMarketCreationOrder.length - 1
    ) {
      nextButtonCopy = newMarketCreationOrder.find((step) => {
        if (step === newMarketCreationOrder[currentStep]) {
          return false;
        }
        return !validations.find(validStep => step === validStep);
      });
    }

    this.setState({
      nextButtonCopy,
      nextStep: newMarketCreationOrder.indexOf(nextButtonCopy)
    });
  }

  handleBackButton() {
    if (this.props.type === BINARY && newMarketCreationOrder[this.props.currentStep - 1] === NEW_MARKET_OUTCOMES) {
      this.props.updateNewMarket({ currentStep: this.props.currentStep - 2 });
    } else {
      this.props.updateNewMarket({ currentStep: this.props.currentStep - 1 });
    }
  }

  handleNextButton() {
    if (this.props.currentStep === newMarketCreationOrder.length - 1) {
      this.props.submitNewMarket(this.props.newMarket);
    } else {
      this.props.updateNewMarket({
        isValid: false,
        currentStep: this.state.nextStep
      });
    }
  }

  updateFormButtonHeight(step) {
    let newHeight = 0;
    if (step !== 0) newHeight = this.formButtons.children[0].clientHeight - 1; // -1 protects against a rendering issue during animation where the height changes to just under measured amount, causing a gap
    this.formButtons.style.height = `${newHeight}px`;
  }

  render() {
    const p = this.props;
    const s = this.state;

    return (
      <article
        ref={(formButtons) => { this.formButtons = formButtons; }}
        className="create-market-form-buttons"
      >
        <div className="create-market-form-buttons-container">
          <div className="create-market-form-buttons-content">
            <button onClick={this.handleBackButton} >
              Back
            </button>
            <button
              className={classNames({
                disabled: !p.isValid
              })}
              onClick={p.isValid && this.handleNextButton}
            >
              Next: {s.nextButtonCopy}
            </button>
          </div>
        </div>
      </article>
    );
  }
}
