import React from 'react';
import TeamDropDown from './teamDropDown';
const { Dropdown, Button } = require('react-bootstrap');

function ScheduleForm(props) {
        function handleSubmit(event) {
            event.stopPropagation();
            const form = event.target;
            const scheduleForm = {
                year: form.year.value,
                month: form.month.value,
                team: form.team.value
            }
            console.log(scheduleForm);
            props.scheduleCallback(scheduleForm);
        }

        return (      
            <form onSubmit={handleSubmit}>
                <div class="form-group row" id="scheduleWrapper">                                        
                    <label for="year">Year</label> 
                        <select className="form-control" id="year">                    
                            <option selected>2020</option>
                            <option>2019</option>
                            <option>2018</option>
                            <option>2017</option>
                            <option>2016</option>
                        </select>                    
                    <label for="month">Month</label>
                    <select className="form-control" id="month">                    
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
                    <Dropdown variant='primary' className='dropdown-toggle' id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Teams
                    </Dropdown>
                    <TeamDropDown />
                </div>
                <Button type="submit">Submit</Button>                
            </form>
            );    
}


export default ScheduleForm;
