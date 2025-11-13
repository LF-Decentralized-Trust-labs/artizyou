export const calculateAmounts = function () {
  const {user} = this.props;
  const {plan} = user;

  this.setState({plan: plan});
};