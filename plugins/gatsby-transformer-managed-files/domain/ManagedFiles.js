const ManagedFiles = x => ({
  emit: () => x,
  chain: (f) => f(x),
  map: (f) => ManagedFilesOf(f(x)),
  inspect: () => `ManagedFiles(${x})`
})

const ManagedFilesOf = x => ManagedFiles(x)

const exportManagedFiles = {
  of: ManagedFilesOf
}

exports.ManagedFiles = exportManagedFiles