import './index.scss';
import React from 'react';
import ReactDom from 'react-dom';


class AppComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			inputValue: '',
			textareaValue: '',
			radioValue: '',
			checkboxValue: [],
			selectValue: '',
			multipleSelectValue: []
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleTextareaChange = this.handleTextareaChange.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleMultipleSelectValueChange = this.handleMultipleSelectValueChange.bind(this);
	}

	handleInputChange(e){
		console.log(e.target.value)
		this.setState({
			inputValue: e.target.value
		})
	}
	handleTextareaChange(e){
		console.log(e.target.value)
		this.setState({
			textareaValue: e.target.value
		})
	}
	handleRadioChange(e){
		console.log(e.target.value)
		this.setState({
			radioValue: e.target.value
		})		
	}
	handleCheckboxChange(e){
		const { checked, value } = e.target
		console.log(checked + ';' + value)
		let { checkboxValue } = this.state
		if(checked && checkboxValue.indexOf(value) === -1){
			checkboxValue.push(value)
		}else{
			checkboxValue = checkboxValue.filter(i => i !== value)
		}
		this.setState({
			checkboxValue
		})
	}
	handleSelectChange(e){
		console.log(e.target.value)
		this.setState({
			selectValue: e.target.value
		})
	}
	handleMultipleSelectValueChange(e){
		//options是个对象, 不是数组
		const {options} = e.target
		console.log(options)
		console.log(Object.keys(options))
		const area = Object.keys(options).filter(i => options[i].selected === true )
										.map(i => options[i].value)
		this.setState({
			multipleSelectValue: area
		})

	}
	render(){
		let {inputValue, textareaValue, radioValue, checkboxValue, selectValue, multipleSelectValue} = this.state;
		return (
			<div>
				<p>单行输入框：<input type="text" value={inputValue} onChange={this.handleInputChange} /> {inputValue}</p>
				<p>多行输入框：<textarea value={textareaValue} onChange={this.handleTextareaChange}/> {textareaValue}</p>
				<div>
					<p>单选框：</p>
					<p>gender:</p>
					<label>
						male
					<input type="radio" checked={radioValue === 'male'} value="male" onChange={this.handleRadioChange}/>
					</label>
					<label>
						female
					<input type="radio" checked={radioValue === 'female'} value="female" onChange={this.handleRadioChange}/>
					</label>
					<p>{radioValue}</p>		
				</div>
				<div>
					<p>复选框</p>
					<p>请选择最喜欢的行业：</p>	
						<input type="checkbox" value="ios工程师" checked={checkboxValue.indexOf('ios工程师') !== -1} onChange={this.handleCheckboxChange} /> <label>ios工程师</label>
						<input type="checkbox" value="java工程师" checked={checkboxValue.indexOf('java工程师') !== -1} onChange={this.handleCheckboxChange} /> <label>	java工程师</label>				
						<input type="checkbox" value="前端工程师" checked={checkboxValue.indexOf('前端工程师') !== -1} onChange={this.handleCheckboxChange} /><label>前端工程师</label>
						[{checkboxValue}]
				</div>
				<div>
					<p>单选select -> {selectValue}</p>
					<select value={selectValue} onChange={this.handleSelectChange}>
						<option value="beijing">北京</option>
						<option value="nanjing">南京</option>
						<option value="hangzhou">杭州</option>
						<option value="shenzhen">深圳</option>
					</select>
					<p>多选select -> [{multipleSelectValue}]</p>
					<select multiple={true} value={multipleSelectValue} onChange={this.handleMultipleSelectValueChange}>
						<option value="beijing">北京</option>
						<option value="nanjing">南京</option>
						<option value="hangzhou">杭州</option>
						<option value="shenzhen">深圳</option>
					</select>

				</div>
			</div>
		);
	}
}

ReactDom.render(
	<AppComponent />,
	document.getElementById('app'),
	() => { console.log('form success') }
);