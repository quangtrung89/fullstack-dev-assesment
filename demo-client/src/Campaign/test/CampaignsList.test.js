import React from 'react';
import { shallow, } from 'enzyme';
import { expect, } from 'chai';
import sinon from 'sinon';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CampaignsList from '../components/CampaignsList';
import {tableHeaders,} from '../components/CampaignsList';

function getWrapper(props) {
  const defaults = {
    data: [],
    selectCampaign: n => n,
    location: {},
    history: {},
  };
  return shallow(<CampaignsList {...defaults} {...props} />);
}

describe('components/CampaignsList', () => {
  it('renders Table component', () => {
    const table = getWrapper().find(Table);
    expect(table).to.have.lengthOf(1);
  });
  it('renders table header with correct props', () => {
    const tableHead = getWrapper().find(TableHead);
    const tableCell = tableHead.find(TableCell);
    expect(tableCell).to.have.lengthOf(4);
    tableCell.forEach((tc, index) => {
      expect(tc.props().numeric).to.equal(tableHeaders[index].numeric);
      expect(tc.props().padding).to.equal(tableHeaders[index].padding ? 'none' : 'default');
      expect(tc.render().text()).to.equal(tableHeaders[index].label);
    });
  });
  it('renders table body with correct data', () => {
    const data = [{
      id: 1,
      name: 'test',
      goal: 'test',
      totalBudget: 100,
      status: 'ok',
    }, {
      id: 2,
      name: 'test2',
      goal: 'test2',
      totalBudget: 100,
      status: 'ok',
    },];
    const wrapper = getWrapper({data,});
    wrapper.setState({selectedRow: 1,});
    const tableBody = wrapper.find(TableBody);
    const tableRow = tableBody.find(TableRow);
    expect(tableRow).to.have.lengthOf(2);
    tableRow.forEach((tr, index) => {
      index === 0 && expect(tr.props().selected).to.equal(true);
      tr.find(TableCell).forEach((tc, tcIndex) => {
        tcIndex === 0 && expect(tc.render().text()).to.equal(data[index].name);
        tcIndex === 1 && expect(tc.render().text()).to.equal(data[index].goal);
        tcIndex === 2 && expect(tc.render().text()).to.equal(data[index].totalBudget.toString());
        tcIndex === 3 && expect(tc.render().text()).to.equal(data[index].status);
      });
    });
  });
  describe('components/CampaignsList/selectRow', () => {
    const data = [{
      id: 1,
      name: 'test',
      goal: 'test',
      totalBudget: 100,
      status: 'ok',
    },];
    const history = {
      push: sinon.spy(),
      location: {pathname: '/test',},
    };
    const selectCampaign = sinon.spy();
    const wrapper = getWrapper({data, history, selectCampaign,});
    wrapper.setState({selectedRow: 1,});
    const tableBody = wrapper.find(TableBody);
    const tableRow = tableBody.find(TableRow);
    tableRow.at(0).simulate('click');
    expect(selectCampaign.calledOnce).to.equal(true);
    expect(selectCampaign.getCall(0).args[0]).to.equal(wrapper.state().selectedRow);
    expect(history.push.calledOnce).to.equal(true);
    expect(history.push.getCall(0).args[0]).to.equal(`${history.location.pathname}?selectedCampaign=${wrapper.state().selectedRow}`);
  });
});
