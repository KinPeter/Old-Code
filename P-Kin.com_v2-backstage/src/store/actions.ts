export enum HttpActions {
    SEND_REQUEST = 'sendRequest',
}

export enum SnackbarActions {
    SHOW_ERROR = 'showError',
    SHOW_SUCCESS = 'showSuccess',
    CLOSE_SNACKBAR = 'closeSnackbar',
}

export enum UIActions {
    START_LOADING = 'startLoading',
    STOP_LOADING = 'stopLoading',
}

export enum AuthActions {
    LOGIN = 'login',
    LOGOUT = 'logout',
    LOGIN_SUCCESS = 'loginSuccess',
}

export enum SkillsActions {
    FETCH_SKILLS = 'fetchSkills',
    POPULATE_SKILLS = 'populateSkills',
    FETCH_OTHERS = 'fetchOtherTechs',
    POPULATE_OTHERS = 'populateOtherTechs',
    MOVE_ITEM_UP = 'moveItemUp',
    MOVE_ITEM_DOWN = 'moveItemDown',
    DELETE_ITEM = 'deleteItem',
    ADD_NEW_ITEM = 'addNewItem',
    SAVE_SKILLS = 'saveSkills',
    MOVE_TECH_LEFT = 'moveItemLeft',
    MOVE_TECH_RIGHT = 'moveItemRight',
    DELETE_TECH = 'deleteTech',
    ADD_NEW_TECH = 'addNewTech',
    SAVE_TECHS = 'saveTechs',
}

export enum PensActions {
    FETCH_PENS = 'fetchPens',
    POPULATE_PENS = 'populatePens',
    MOVE_ITEM_UP = 'movePenUp',
    MOVE_ITEM_DOWN = 'movePenDown',
    DELETE_ITEM = 'deletePen',
    ADD_NEW_ITEM = 'addNewPen',
    SAVE_PENS = 'savePens',
}

export enum PortfolioActions {
    FETCH_PORTFOLIO = 'fetchPortfolio',
    POPULATE_PORTFOLIO = 'populatePortfolio',
    DELETE_PORTFOLIO_ITEM = 'deletePortfolioItem',
    UPDATE_PORTFOLIO_ITEM = 'updatePortfolioItem',
    ADD_NEW_PORTFOLIO = 'addNewPortfolioItem',
    ADD_BADGE_TO_ITEM = 'addBadgeToItem',
    DELETE_BADGE_FROM_ITEM = 'deleteBadgeFromItem',
    ADD_FEATURE_TO_ITEM = 'addFeatureToItem',
    DELETE_FEATURE_FROM_ITEM = 'deleteFeatureFromItem',
    SAVE_NEW_PORTFOLIO = 'saveNewPortfolioItem',
    FETCH_FILTER_BADGES = 'fetchBadges',
    POPULATE_FILTER_BADGES = 'populateBadges',
    ADD_FILTER_BADGE = 'addFilterBadge',
    DELETE_FILTER_BADGE = 'deleteFilterBadge',
    SAVE_FILTER_BADGES = 'saveFilterBadges',
    MOVE_BADGE_LEFT = 'moveBadgeLeft',
    MOVE_BADGE_RIGHT = 'moveBadgeRight',
}
