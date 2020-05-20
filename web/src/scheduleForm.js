import React, { Component } from 'react';
import TeamDropDown from './teamDropDown';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router-dom'


class ScheduleForm extends React.Component {          
      render() {
        return (      
            <form onSubmit={this.props.handler}>
                <div class="form-group row" id="scheduleWrapper">                                        
                    <label for="year">Year</label> 
                        <select class="form-control" id="year">                    
                            <option selected>2020</option>
                            <option>2019</option>
                            <option>2018</option>
                            <option>2017</option>
                            <option>2016</option>
                        </select>                    
                    <label for="month">Month</label>
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
                </div>
                <div class="form-group row">
                    <label>Team</label>
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Teams
                    </button>
                    <TeamDropDown />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>                
            </form>
            );    
      }
}


export default ScheduleForm;