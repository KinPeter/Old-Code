import React from "react";
import "./Autocomplete.scss";
import InputField from "./InputField/InputField";
import OptionBox from "./Options/OptionBox";
import SubmitButton from "./SubmitButton/SubmitButton";
import ToggleButton from "./ToggleButton/ToggleButton";

type AutocompleteProps = {
    wordlist: string[];
    placeholder: string;
    buttonText: string;
    onSubmitted: (value: string) => void;
};

type AutocompleteState = {
    wordList: string[];
    options: string[];
    optionIndex: number;
    value: string;
    enabled: boolean;
};

class Autocomplete extends React.Component<AutocompleteProps, AutocompleteState> {
    state: AutocompleteState
    listRef: any

    constructor(props: AutocompleteProps) {
        super(props);
        this.state = {
            wordList: props.wordlist,
            options: [],
            optionIndex: -1,
            value: "",
            enabled: true
        };
        this.listRef = React.createRef();
    }

    componentDidUpdate() {
        if (!this.state.wordList.length) {
            this.setState({ wordList: this.props.wordlist });
        }
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input: string = event.target.value;
        this.setState({ value: input });
        if (input && this.state.enabled) {
            const newOptions: string[] = this.state.wordList.filter(word =>
                word.toLocaleLowerCase().includes(input.toLocaleLowerCase())
            );
            this.setState({ options: newOptions, optionIndex: -1 });
        } else {
            this.setState({ options: [], optionIndex: -1 });
        }
    };

    handleSelect = (value: string): void => {
        this.setState({ value: value, options: [], optionIndex: -1 }, this.handleEnterOrButtonClick);
    };

    handleEscapeKey = (): void => {
        this.setState({ options: [], optionIndex: -1 });
    };

    handleEnterOrButtonClick = (): void => {
        this.props.onSubmitted(this.state.value);
        this.setState({ options: [], value: "", optionIndex: -1 });
    };

    handleDownKey = (): void => {
        if (this.state.options.length && this.state.optionIndex < this.state.options.length-1) {
            this.setState({ optionIndex: this.state.optionIndex+1 }, () => {
                this.setState({ value: this.state.options[this.state.optionIndex] });
            });
        }
        if (this.state.optionIndex > 4) {
            this.listRef.current.scrollTop = this.listRef.current.scrollTop + 24;
        }
    }

    handleUpKey = (): void => {
        if (this.state.options.length && this.state.optionIndex > 0 ) {
            this.setState({ optionIndex: this.state.optionIndex - 1 }, () => {
                this.setState({ value: this.state.options[this.state.optionIndex] });
            });
        }
        if (this.state.optionIndex > 4) {
            this.listRef.current.scrollTop = this.listRef.current.scrollTop - 24;
        }
    }

    handleToggle = (): void => {
        this.setState({enabled: !this.state.enabled});
    }

    render() {
        return (
            <div className="Autocomplete">
                <InputField
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    changed={this.handleInputChange}
                    onEnter={this.handleEnterOrButtonClick}
                    onEscape={this.handleEscapeKey}
                    onDownKey={this.handleDownKey}
                    onUpKey={this.handleUpKey}
                />
                {this.state.options.length ? (
                    <OptionBox
                    options={this.state.options}
                    optionIndex={this.state.optionIndex}
                    selected={this.handleSelect}
                    clickedOutside={this.handleEscapeKey} // same effect as pressing ESC
                    setRef={this.listRef} // React.createRef() will set reference for OptionBox/ul
                    />
                    ) : null}
                <SubmitButton
                    buttonText="Search"
                    clicked={this.handleEnterOrButtonClick}
                />
                <ToggleButton
                    clicked={this.handleToggle}
                    isToggled={this.state.enabled} />
            </div>
        );
    }
}

export default Autocomplete;
