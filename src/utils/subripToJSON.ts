/**
 * `convertTimingsToJSON` is a utility which is consumed within the `NarrationText` component in
 * order to parse SRT (SubRip text) format files to JSON.
 *
 * A SRT will need to be produced prior to utilising this utility.
 *
 * @property {string} [data] The incoming SRT data.
 * @returns {array}
 */
const convertTimingsToJSON = data => {
  const lines = `${data}\n`.split("\n");

  let delay = 0;
  const output = [];
  let buffer = {
    content: ""
  };

  /**
   * `reducer` is executed by `reduce()` and goes line by line in the multi-line string, allow us to
   * parse it and do any necessary modifications.
   *
   * @property {object} [accumulator] The accumulated callback's return values.
   * @property {number} [initialLine] The current value
   * @returns {object}
   */
  const reducer = (accumulator, initialLine) => {
    // The current line, minus any white space at the start or end
    const line = initialLine.trim();

    // Line by line, we go through and find out what type of content we have
    // Check if this `line` is the starting line number
    if (line && !buffer.id) {
      buffer.id = line;

      // Check if this `line` start/end timings
    } else if (!buffer.start) {
      // Split the start/end timings string by the ' --> '
      const range = line.split(" --> ");

      // Split start times (range[0]) into the separate timing values
      const start = {
        minutes: range[0].split(":")[1],
        seconds: range[0].split(":")[2].split(",")[0],
        milliseconds: range[0].split(":")[2].split(",")[1]
      };

      // Convert the time to a `new Date`
      // The date here doesn't really matter and won't be used, we only want the time
      const startTotal = new Date(
        `2000-01-01T00:${start.minutes}:${start.seconds}.${start.milliseconds}`
      );

      // Convert the seconds processed above to a number
      const startTotalSeconds = parseInt(
        `${start.seconds}${start.milliseconds}`,
        10
      );

      // Split end times (range[1]) into the separate timing values
      const end = {
        minutes: range[1].split(":")[1],
        seconds: range[1].split(":")[2].split(",")[0],
        milliseconds: range[1].split(":")[2].split(",")[1]
      };

      // Convert the time to a `new Date`
      // The date here doesn't really matter and won't be used, we only want the time
      const endTotal = new Date(
        `2000-01-01T00:${end.minutes}:${end.seconds}.${end.milliseconds}`
      );

      // Convert the seconds processed above to a number
      const endTotalSeconds = parseInt(`${end.seconds}${end.milliseconds}`, 10);

      // The delay amount for how long the animation needs to wait before start
      // Used as between sentences, the narrator generally will leave a natural gap inbetween, but
      // we don't want animation to begin too early
      buffer.delay = startTotalSeconds - delay;

      // Set this loops delay to the `endTotalSeconds`
      delay = endTotalSeconds;

      // Set the start time
      buffer.start =
        startTotal.getTime() - new Date("2000-01-01T00:00:00.00").getTime();

      // Set the duration, which is the end time minus the start time
      buffer.duration = endTotal - startTotal;

      // Set the end time
      buffer.end = startTotalSeconds + buffer.duration;

      // Check if this `line` is the sentence copy
    } else if (line !== "") {
      // The sentence with a space before if not the first
      const lineToAdd = buffer.content !== "" ? ` ${line}` : line;

      // Add each line as a sentence, with a space before if not the first
      buffer.content += lineToAdd;
    } else {
      // Add all the created content to the output
      output.push(buffer);

      // Reset the buffer for the next line
      buffer = {
        content: ""
      };
    }

    // Return this lines content
    return output;
  };

  // Return all the lines
  return lines.reduce(reducer, 0);
};

export default convertTimingsToJSON;
