// import Employee from '../models/Employee.js';
import Employee from "../models/employee.js";


const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json({ employees, count: employees.length });
        // res.status(200).json({ employees });
        // res.send('Get all employees');
    } catch (err) {
    res.sttus(500).json({ msg: err });
    }    
}

const getEmployee = async (req, res) => {
    try {
        let {id: employeeId} = req.params; // creating an alias for id which is taken from the request uri since id is generic and we are getting error. it creates ans alias employeeId for the id taken from /:id
        const employee = await Employee.findOne({ _id: employeeId });
        if (!employee) {
            return res.status(404).json({ msg: `No employee with ID ${employeeId} found.` });
        }
        res.status(200).json({ employee });

        // res.send('Get a single  employees');
    } catch (err) {
        res.status(500).json({ msg: err });
    }
    
}

const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({employee}); //json({ msg: 'Employee added succesfully })
        // res.send('create a new employee');
    } catch (err) {
        res.status(500).json({ msg: err })
    }
    
}

const updateEmployee = async (req, res) => {
    try {
        let {id: employeeId} = req.params;
        const employee = await Employee.findOneAndUpdate({ _id: employeeId }, req.body, {
            new: true,
            runValidators: true
        });
        if(!employee) {
            return res.status(404).json({ msg: `No employee with id ${employeeId} found.` });
        }
        res.status(200).json({ msg: 'Successfully updated employee'});
        // res.send('update an employee');
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        let {id: employeeId} = req.params; 
        const employee = await Employee.findOneAndDelete({ _id: employeeId });
        if (!employee) {
            return res.status(404).json({ msg: `No employee with ID ${employeeId} found.` });
        }
        res.status(200).json({ msg: 'Employee successfully deleted' });
        // res.send('delete an  employee');
    } catch (err) {
        res.status(500).json({ msg: err });
    }  
}

export {getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };