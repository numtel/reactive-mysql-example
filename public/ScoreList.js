var ScoreList = React.createClass({
  getInitialState: function() {
    return {
      active: null,
      newItems: []
    };
  },
  submitInsert: function(event){
    event.preventDefault();
    var input = event.target.querySelector('input');

    if(input.value.length > 45){
      return alert('Name too long (maximum 45 characters)');
    }

    insertPlayer(input.value);

    // Latency compensation
    var newItems = this.state.newItems;
    newItems.push({
      id: 'x-' + newItems.length,
      name: input.value,
      score: 0
    });
    this.setState({ newItems: newItems });

    // Reset form
    input.value = "";
  },
  componentWillReceiveProps: function(nextProps) {
    if(this.state.newItems.length){
      // Reset latency compensation
      this.setState({ newItems: [] });
    }
  },
  render: function() {
    var results = this.props.results;
    var newItems = this.state.newItems;
    var items = [];
    for(var i = 0; i < results.length; i++){
      items.push(<ScoreItem key={results[i].id} item={results[i]} />);
    }
    // Also append items in latency-compensation array
    for(var i = 0; i < newItems.length; i++){
      items.push(<ScoreItem key={newItems[i].id} item={newItems[i]} />);
    }
    return (
      <div className="score">
        <ol className="score-list">{items}</ol>
        <form className="score-insert-player" onSubmit={this.submitInsert}>
          <input placeholder="New player's name..." />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
});
