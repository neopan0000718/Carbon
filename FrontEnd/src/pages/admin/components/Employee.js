import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import {
  ComponentWapper,
  Componentindex,
  Componentinput,
  Componentbutton,
  Componenttitle,
  ComponentoptionWapper,
  Componentcheckbox,
  Innerpageoption
} from '../../../components/style';

class Employee extends PureComponent {
  state = {
    hoveredBox: null,
    pages: [
      { id: 1, text: 'Post' },
      { id: 2, text: 'Revise' },
      { id: 3, text: 'Delete' },
      { id: 4, text: 'Retieve' },
    ],
    display: false
  };

  handleMouseEnter = (id) => {
    this.setState({ hoveredBox: id });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredBox: null });
  };

  whichpage(page) {
    switch (page) {
      case 1:
        {
          return (
            <ComponentWapper>
              <ComponentoptionWapper >
                <Componentindex>Name</Componentindex>
                <Componentinput ref={(input) => { this.name = input }} />
              </ComponentoptionWapper >
              <ComponentoptionWapper>
                <Componentindex>Gender</Componentindex>
                <Componentinput ref={(input) => { this.gender = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentindex>Phone</Componentindex>
                <Componentinput ref={(input) => { this.phone = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentindex>Mail</Componentindex>
                <Componentinput ref={(input) => { this.mail = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentindex>Region</Componentindex>
                <Componentinput ref={(input) => { this.region = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentbutton onClick={() => this.props.employeepost(this.name, this.gender, this.phone, this.mail, this.region)}>Post</Componentbutton>
              </ComponentoptionWapper>
            </ComponentWapper>
          );
        }
      case 2:
        {
          return (
            <ComponentWapper>
              <ComponentoptionWapper >
                <Componentindex>EID</Componentindex>
                <Componentinput ref={(input) => { this.eid = input }} />
              </ComponentoptionWapper >
              <ComponentoptionWapper >
                <Componentindex>Name</Componentindex>
                <Componentinput ref={(input) => { this.name = input }} />
              </ComponentoptionWapper >
              <ComponentoptionWapper>
                <Componentindex>Gender</Componentindex>
                <Componentinput ref={(input) => { this.gender = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentindex>Phone</Componentindex>
                <Componentinput ref={(input) => { this.phone = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentindex>Mail</Componentindex>
                <Componentinput ref={(input) => { this.mail = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentindex>Region</Componentindex>
                <Componentinput ref={(input) => { this.region = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentbutton onClick={() => this.props.employeerevise(this.eid, this.name, this.gender, this.phone, this.mail, this.region)}>Revise</Componentbutton>
              </ComponentoptionWapper>
            </ComponentWapper>
          );
        }
      case 3:
        {
          return (
            <ComponentWapper>
              <ComponentoptionWapper >
                <Componentindex>EID</Componentindex>
                <Componentinput ref={(input) => { this.eid = input }} />
              </ComponentoptionWapper >
              <ComponentoptionWapper>
                <Componentindex>Name</Componentindex>
                <Componentinput ref={(input) => { this.name = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentbutton onClick={() => this.props.employeedelete(this.eid, this.name)}>Delete</Componentbutton>
              </ComponentoptionWapper>
            </ComponentWapper>
          );
        }
      case 4:
        {
          return (
            <ComponentWapper>
              <ComponentoptionWapper >
                <Componentindex>EID</Componentindex>
                <Componentinput ref={(input) => { this.eid = input }} />
              </ComponentoptionWapper >
              <ComponentoptionWapper>
                <Componentindex>Name</Componentindex>
                <Componentinput ref={(input) => { this.name = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentindex>PID</Componentindex>
                <Componentinput ref={(input) => { this.pid = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentindex>Region</Componentindex>
                <Componentinput ref={(input) => { this.region = input }} />
              </ComponentoptionWapper>
              <ComponentoptionWapper>
                <Componentbutton onClick={() => { this.props.employeeretrieve(this.eid, this.name, this.pid, this.region); this.setState({ display: true }); }}>Retrieve</Componentbutton>
              </ComponentoptionWapper>
              {this.state.display ?
                <div>
                  <ComponentoptionWapper>
                    <Componentcheckbox>list</Componentcheckbox>
                  </ComponentoptionWapper>
                  <ComponentoptionWapper>
                    <Componentbutton onClick={() => { this.props.setpage(2) }}>revise</Componentbutton>
                    <Componentbutton onClick={() => { this.props.setpage(3) }} className='reject'>Delete</Componentbutton>
                  </ComponentoptionWapper>
                </div>
                :
                ''}
            </ComponentWapper>
          );
        }
      default:
        return;
    }
  }

  render() {
    const { setpage, employeepage } = this.props;
    const { hoveredBox, pages } = this.state;
    return (
      <ComponentWapper>
        <Componenttitle>Access Assignment</Componenttitle>
        <ComponentoptionWapper>
          {pages.map(({ id, text }) => (
            <Innerpageoption
              key={id}
              onClick={() => setpage(id)}
              onMouseEnter={() => this.handleMouseEnter(id)}
              onMouseLeave={this.handleMouseLeave}
              className={employeepage === id || hoveredBox === id ? 'mousein' : ''}
            >
              {text}
            </Innerpageoption>
          ))}
        </ComponentoptionWapper>
        {this.whichpage(employeepage)}
      </ComponentWapper>
    )
  }
}

const mapStateToProps = (state) => ({
  employeepage: state.admin.employeepage,
})

const mapDisptchToProps = (dispatch) => {
  return {
    setpage(id) {
      dispatch(actionCreators.setpage(id));
    },
    employeepost(name, gender, phone, mail, region) {
      dispatch(actionCreators.employeepost(name.value, gender.value, phone.value, mail.value, region.value));
    },
    employeerevise(eid, name, gender, phone, mail, region) {
      dispatch(actionCreators.employeerevise(eid.value, name.value, gender.value, phone.value, mail.value, region.value));
    },
    employeedelete(eid, name) {
      dispatch(actionCreators.employeedelete(eid.value, name.value));
    },
    employeeretrieve(eid, name, pid, region) {
      const eidValue = eid.value || null;
      const nameValue = name.value || null;
      const pidValue = pid.value || null;
      const regionValue = region.value || null;
      dispatch(actionCreators.employeeretrieve(eidValue, nameValue, pidValue, regionValue));
    }
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(Employee);