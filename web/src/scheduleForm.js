import React, { Component } from 'react';
import TeamDropDown from './teamDropDown';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router-dom'


class ScheduleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            month: ''
        };
            
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleSubmit(event) {
        this.setState(
            {
                year: event.target.year,
                month: event.target.month
            }
        );
      }

      render() {
        return (      
            <form onSubmit={this.handleSubmit}>
                <div class="form-group" id="scheduleWrapper">            
                    <div className="Schedule">
                        <h3>Find a game</h3>
                        <label>
                            Team: 
                            <div class="dropdown">
                                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Teams
                                </button>
                                <TeamDropDown />
                            </div>
                        </label>
                        <label>Year: 
                            <select class="form-control" id="year">                    
                                <option selected>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2016</option>
                            </select>
                        </label>
                        <label>Month:
                        <select class="form-control" id="month">                    
                                <option value="01">Jan</option>
                                <option value="02">Feb</option>
                                <option value="03">Mar</option>
                                <option value="04">Apr</option>
                                <option value="05">May</option>
                                <option value="06">Jun</option>
                                <option value="07">Jul</option>
                                <option value="08">Aug</option>
                                <option value="09">Sep</option>
                                <option value="10">Oct</option>
                                <option value="11">Nov</option>
                                <option value="12">Dec</option>
                            </select>
                        </label>                                            
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
            );    
      }
}


export default ScheduleForm;