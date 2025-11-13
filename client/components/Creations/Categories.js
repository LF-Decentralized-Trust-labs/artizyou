import React, { PureComponent } from "react";
import styled from "styled-components";

import FormCheckbox from "../Form/Checkbox";
import withCategories from "../../containers/withCategories";
import withUser from "../../containers/withUser";
import TextArea from "../Form/TextArea";
import categories from "../../reducers/categories";

const CATEGORIES_MAX = 3;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const CheckboxWrapper = styled(FormCheckbox)`
  top: 0;
  margin: 0 5px 0 0;
`;

const CheckboxSpan = styled.span`
  position: relative;
  top: 2px;
  left: 10px;
  margin-bottom: 0;
  color: ${(props) => props.theme.artz.darkGrey};
`;

const Category = styled.div`
  flex: 0 0 auto;
  justify-content: start;
  display: flex;
  padding: 22px 25px;
  margin: 6px 0px;
  width: 100%;
  background: ${({ selected, theme }) =>
    selected ? "#FFF" : theme.artz.greyWhite};
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.artz.primaryColor : theme.artz.gray};
  color: ${(props) => props.theme.artz.darkGrey};
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.24em;
  cursor: ${({ disabled, selected }) =>
    disabled && !selected ? "default" : "pointer"};
  transition: all 0.25s ease;

  &:hover {
    border: 1px solid ${(props) => props.theme.artz.primaryColor};
  }

  ${(props) => props.theme.artz.breakpoint.md} {
    width: 48%;
    margin: 6px 4px;
  }
`;

class CreationsCategories extends PureComponent {
  state = {
    showOther: false,
    otherName: this.props.otherCategory ? this.props.otherCategory : "",
    selectedCategories: this.props.selected,
  };

  onClick = (id) => () => {
    const { onSelect, otherCategory } = this.props;
    const { selectedCategories } = this.state;
    const newSelected = [...selectedCategories];
    const selectedOther = selectedCategories.includes("other");
    const index = newSelected.indexOf(id);
    if (index === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(index, 1);
    }
    
    if (id === "other" && !(newSelected.length > CATEGORIES_MAX)) {
      this.setState({ showOther: !selectedOther });
      if (!selectedOther) {
        this.setState({ otherName: otherCategory });
        this.props.onAddOtherCreation(otherCategory);
      }
    }

    if (newSelected.length > CATEGORIES_MAX) {
      return null;
    }

    this.setState({ selectedCategories: newSelected });
    onSelect(newSelected);
  };

  setOtherName = async (e) => {
    this.props.onAddOtherCreation(e.target.value);
    this.setState({ otherName: e.target.value });
  };

  renderCategories = () => {
    const { categoryList, user, creationCategories } = this.props;
    const { selectedCategories } = this.state;
    const addedCategories = creationCategories
      ? Object.values(creationCategories)
      : [];
    const allCategories = [...addedCategories, ...categoryList].filter(
      (category) => category.main
    );
    const hasOtherCategory = addedCategories.find((obj) => !obj.main);
    var selectedCategoryIds = [...selectedCategories];
    if (hasOtherCategory && selectedCategories.includes(hasOtherCategory.id)) {
      const otherIndex = selectedCategoryIds.findIndex(
        (id) => id == hasOtherCategory.id
      );
      selectedCategoryIds.splice(otherIndex, 1, "other");
      this.setState({
        showOther: true,
        selectedCategories: selectedCategoryIds,
      });
    }

    const userCategories = [
      ...allCategories,
      { id: "other", nameEn: "Other (Specify)", nameFr: "Autre (préciser)" },
    ].reduce((result, item) => {
      if (!result.some((existingItem) => existingItem.id === item.id)) {
        result.push(item);
      }
      return result;
    }, []);

    return userCategories.map(({ id, nameFr, nameEn }) => {
      let label = nameFr;
      if (user.language === "en") {
        label = nameEn;
      }
      return (
        <Category
          className="category"
          key={id}
          disabled={selectedCategoryIds.length >= CATEGORIES_MAX}
          onClick={this.onClick(id)}
          selected={selectedCategoryIds.includes(id)}
        >
          <CheckboxWrapper checked={selectedCategoryIds.includes(id)} />{" "}
          <CheckboxSpan>{label}</CheckboxSpan>
        </Category>
      );
    });
  };

  render() {
    const { otherName, showOther } = this.state;
    return (
      <Wrapper>
        {this.renderCategories()}
        {showOther ? (
          <TextArea
            value={otherName}
            name="other"
            onChange={this.setOtherName}
            maxLength={250}
          />
        ) : null}
      </Wrapper>
    );
  }
}

export default withUser(withCategories(CreationsCategories));
