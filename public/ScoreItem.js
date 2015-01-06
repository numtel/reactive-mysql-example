var ScoreItem = React.createClass({
  onClick: function() {
    this._owner.setState({ active: this });
  },
  increment: function() {
    incrementScore(this.props.item.id);
    // Latency compensation
    this.setState({ score: (this.state.score || this.props.item.score) + 1 });
  },
  remove: function() {
    deletePlayer(this.props.item.id);
    // Latency compensation
    this.setState({ deleted: true });
  },
  getInitialState: function() {
    return {
      score: null,
      deleted: false
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if(this.state.score){
      // Reset latency compensation
      this.setState({ score: null });
    }
  },
  render: function() {
    var item = this.props.item;
    var score = this.state.score || item.score;
    var isActive = this._owner.state.active === this;
    var className = this.state.deleted ? 'hidden' :
                      isActive ? 'active' : '';
    return (
      <li onClick={this.onClick} className={className}>
        <span className="name">{item.name}</span>
        <span className="increment control" onClick={this.increment}>
          <span>Increment Score</span>
        </span>
        <span className="delete control" onClick={this.remove}>×</span>
        <span className="score">{score}</span>
      </li>
    );
  }
});
