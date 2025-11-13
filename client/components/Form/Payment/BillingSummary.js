import React, {Component} from 'react';
import styled from 'styled-components';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import withUser from '../../../containers/withUser';

const Wrapper = styled.div`
  width: 100%;
`;

const Row = styled.div`
  clear: both;
`;

const Head = styled.div`
  float: left;
  overflow: hidden;
  padding: 3px 1.8%;
  width: 28%;
`;

const Cell = styled.div`
  float: right;
  overflow: hidden;
  padding: 3px 1.8%;
  width: 28%;
`;

class BillingSummary extends Component {
  renderSubTotal = () => {
    const {plan} = this.props;
    const {taxes} = plan;

    if (taxes.length > 1) {
      return (
        <Row>
          <Head><FormattedMessage id="payment.bill.sub_total"/></Head>
          <Cell>
            <FormattedNumber
              value={plan.amount}
              style="currency"
              currency={plan.currency}
            />
          </Cell>
        </Row>
      )
    }

    return null;
  };

  render() {
    const {plan, updatedPlan} = this.props;
    const {taxes} = plan;

    return (
      <Wrapper>
        {this.renderSubTotal()}
        {
          taxes && taxes.map(({name, amount}) => {
            return (
              <Row>
                <Head>{name}</Head>
                <Cell>
                  <FormattedNumber
                    value={amount}
                    style="currency"
                    currency={plan.currency}
                  />
                </Cell>
              </Row>
            )
          })
        }
        <Row>
          <Head><FormattedMessage id="payment.bill.total"/></Head>
          <Cell>
            {updatedPlan.currency}${updatedPlan.total}
          </Cell>
        </Row>
      </Wrapper>
    )
  };
};

export default withUser(BillingSummary);
