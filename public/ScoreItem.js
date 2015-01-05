var ScoreItem = React.createClass({
  onClick: function() {
    this._owner.setState({ active: this });
  },
  increment: function() {
    incrementScore(this.props.item.id);
  },
  render: function() {
    var item = this.props.item;
    var isActive = this._owner.state.active === this;
    return (
      <li onClick={this.onClick} className={isActive ? 'active' : ''}>
        <span className="name">{item.name}</span>
        <span className="increment" onClick={this.increment}>
          <span>Increment Score</span>
        </span>
        <span className="score">{item.score}</span>
      </li>
    );
  }
});
