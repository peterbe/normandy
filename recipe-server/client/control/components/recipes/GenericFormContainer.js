import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import React from 'react';

@autobind
export default class GenericFormContainer extends React.PureComponent {
  static propTypes = {
    form: PropTypes.node.isRequired,
    formAction: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    formProps: PropTypes.object,
  };

  static defaultProps = {
    formProps: {},
  };

  state = {
    formErrors: undefined,
  };

  /**
   * Clear the present form errors just before submitting the form.
   */
  onBeforeSubmit() {
    this.setState({
      formErrors: undefined,
    });
  }

  /**
   * Update the existing recipe and display a message.
   * @param {Object} formValues     Key-value pairs from the form's fields.
   */
  async handleSubmit(formValues) {
    try {
      const actionValues = await this.props.formAction(formValues);
      await this.props.onSuccess(actionValues);
    } catch (error) {
      this.setState({
        formErrors: error.data || error,
      });

      await this.props.onFailure(error);
    }
  }

  render() {
    const FormElement = this.props.form;

    return (
      <FormElement
        onBeforeSubmit={this.onBeforeSubmit}
        onSubmit={this.handleSubmit}
        errors={this.state.formErrors}
        {...this.props.formProps}
      />
    );
  }
}
