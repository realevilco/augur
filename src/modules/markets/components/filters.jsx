import React from 'react';
import classnames from 'classnames';

import Checkbox from '../../common/components/checkbox';

module.exports = React.createClass({
    propTypes: {
		isCheckedOpen: React.PropTypes.bool,
		isCheckedExpired: React.PropTypes.bool,
		isCheckedBinary: React.PropTypes.bool,
		isCheckedCategorical: React.PropTypes.bool,
		isCheckedScalar: React.PropTypes.bool,
		isCheckedCombinatorial: React.PropTypes.bool,

		onClickFilterOpen: React.PropTypes.func,
		onClickFilterExpired: React.PropTypes.func,
		onClickFilterBinary: React.PropTypes.func,
		onClickFilterCategorical: React.PropTypes.func,
		onClickFilterScalar: React.PropTypes.func,
		onClickFilterCombinatorial: React.PropTypes.func
    },

    render: function() {
        var p = this.props;
        return (
            <aside className="filters">
                <span className="title">Type</span>
                <Checkbox className="filter" text="Yes / No" isChecked={ p.isCheckedBinary } onClick={ p.onClickFilterBinary } />
                <Checkbox className="filter" text="Categorical" isChecked={ p.isCheckedCategorical } onClick={ p.onClickFilterCategorical } />
                <Checkbox className="filter" text="Scalar" isChecked={ p.isCheckedScalar } onClick={ p.onClickFilterScalar } />
                {/* <Checkbox className="filter" text="Combinatorial" isChecked={ p.isCheckedCombinatorial } onClick={ p.onClickFilterCombinatorial } /> */}

                <span className="title">Status</span>
                <Checkbox className="filter" text="open" isChecked={ p.isCheckedOpen } onClick={ p.onClickFilterOpen } />
                <Checkbox className="filter" text="expired" isChecked={ p.isCheckedExpired } onClick={ p.onClickFilterExpired } />
            </aside>
        );
    }
});