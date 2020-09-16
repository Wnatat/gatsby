const Timelines = x => ({
  emit: () => x,
  chain: (f) => f(x),
  map: (f) => TimelinesOf(f(x)),
  inspect: () => `List(${x})`
})

const TimelinesOf = x => Timelines(x)

const exportTimelines = {
  of: TimelinesOf
}

exports.Timelines = exportTimelines